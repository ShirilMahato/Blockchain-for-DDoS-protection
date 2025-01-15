// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.21;

// contract IPBlacklist {
//     // Mapping to store IP addresses and their blacklist status
//     mapping(string => bool) public blacklisted;

//     // Function to add an IP address to the blacklist
//     function addToBlacklist(string memory _ip) public {
//         blacklisted[_ip] = true;
//     }

//     // Function to remove an IP address from the blacklist
//     function removeFromBlacklist(string memory _ip) public {
//         blacklisted[_ip] = false;
//     }

//     // Function to check if an IP address is blacklisted
//     function isBlacklisted(string memory _ip) public view returns (bool) {
//         return blacklisted[_ip];
//     }
// }

// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// contract IPBlacklist {
//     mapping(string => bool) public blacklisted;
//     string[] private blacklistArray;  // Array to store blacklisted IPs

//     function addToBlacklist(string memory _ip) public {
//         if (!blacklisted[_ip]) {
//             blacklisted[_ip] = true;
//             blacklistArray.push(_ip);  // Add to array if not already blacklisted
//         }
//     }

//     function removeFromBlacklist(string memory _ip) public {
//         if (blacklisted[_ip]) {
//             blacklisted[_ip] = false;
//             // Optional: Remove from the array; consider keeping it simple due to gas cost implications
//         }
//     }

//     function isBlacklisted(string memory _ip) public view returns (bool) {
//         return blacklisted[_ip];
//     }

//     // Function to retrieve all blacklisted IPs
//     function getAllBlacklisted() public view returns (string[] memory) {
//         return blacklistArray;
//     }
// }


// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IPBlacklist {
    mapping(string => bool) public blacklisted;
    string[] private blacklistArray;

    function addToBlacklist(string memory _ip) public {
        if (!blacklisted[_ip]) {
            blacklisted[_ip] = true;
            blacklistArray.push(_ip);
        }
    }

    function removeFromBlacklist(string memory _ip) public {
        if (blacklisted[_ip]) {
            blacklisted[_ip] = false;
            // Remove IP from array
            for (uint i = 0; i < blacklistArray.length; i++) {
                if (keccak256(abi.encodePacked(blacklistArray[i])) == keccak256(abi.encodePacked(_ip))) {
                    blacklistArray[i] = blacklistArray[blacklistArray.length - 1];
                    blacklistArray.pop();
                    break;
                }
            }
        }
    }

    function isBlacklisted(string memory _ip) public view returns (bool) {
        return blacklisted[_ip];
    }

    function getAllBlacklisted() public view returns (string[] memory) {
        string[] memory activeBlacklisted = new string[](blacklistArray.length);
        uint counter = 0;
        for (uint i = 0; i < blacklistArray.length; i++) {
            if (blacklisted[blacklistArray[i]]) {
                activeBlacklisted[counter] = blacklistArray[i];
                counter++;
            }
        }
        // Copy the active blacklist to a trimmed array
        string[] memory trimmedArray = new string[](counter);
        for (uint i = 0; i < counter; i++) {
            trimmedArray[i] = activeBlacklisted[i];
        }
        return trimmedArray;
    }
}
