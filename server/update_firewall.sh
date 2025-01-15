#!/bin/bash

# File location of the blacklist
BLACKLISTED_IPS_FILE="./blacklistedIPs.json"
LOG_FILE="./firewall_log.txt"

# Ensure necessary tools are installed
check_requirements() {
    if ! command -v jq &> /dev/null; then
        echo "jq could not be found. Please install jq to run this script."
        exit 1
    fi

    if ! command -v iptables &> /dev/null; then
        echo "iptables could not be found. Please ensure iptables is installed and accessible."
        exit 1
    fi
}

# Validate IP address format
validate_ip() {
    if [[ $1 =~ ^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
        return 0
    else
        echo "$(date +"%Y-%m-%d %T") - Invalid IP address detected: $1" >> "$LOG_FILE"
        return 1
    fi
}

# Function to block IP
block_ip() {
    if validate_ip $1; then
        if ! sudo iptables -C INPUT -s $1 -j DROP &> /dev/null; then
            sudo iptables -I INPUT -s $1 -j DROP
            echo "$(date +"%Y-%m-%d %T") - Blocked IP: $1" >> "$LOG_FILE"
        fi
    fi
}

# Function to unblock IP
unblock_ip() {
    if validate_ip $1; then
        if sudo iptables -C INPUT -s $1 -j DROP &> /dev/null; then
            sudo iptables -D INPUT -s $1 -j DROP
            echo "$(date +"%Y-%m-%d %T") - Unblocked IP: $1" >> "$LOG_FILE"
        fi
    fi
}

# Main logic to update firewall rules based on the JSON file
update_firewall() {
    echo "$(date +"%Y-%m-%d %T") - Updating firewall rules." >> "$LOG_FILE"

    # Read blacklisted IPs from file
    local blacklisted_ips=$(jq -r '.[]' "$BLACKLISTED_IPS_FILE")

    # Get currently blocked IPs from iptables with more stringent matching
    local current_blocked=$(sudo iptables -L INPUT -n --line-numbers | awk '/DROP/ && /[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+/ {print $4}')

    echo "$(date +"%Y-%m-%d %T") - Current iptables entries being processed: $current_blocked" >> "$LOG_FILE"

    # Convert to arrays
    readarray -t blacklisted_array <<< "$blacklisted_ips"
    readarray -t current_blocked_array <<< "$current_blocked"

    # Block new IPs
    for ip in "${blacklisted_array[@]}"; do
        if [[ ! " ${current_blocked_array[*]} " =~ " ${ip} " ]]; then
            block_ip "$ip"
        fi
    done

    # Unblock IPs not on the blacklist anymore
    for ip in "${current_blocked_array[@]}"; do
        if [[ ! " ${blacklisted_array[*]} " =~ " ${ip} " ]]; then
            unblock_ip "$ip"
        fi
    done

    echo "$(date +"%Y-%m-%d %T") - Firewall rules updated successfully." >> "$LOG_FILE"
}

# Start script execution
check_requirements
update_firewall

echo "Firewall update complete."
