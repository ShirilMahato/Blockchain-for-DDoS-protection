#!/usr/bin/env bash

# Paths to Suricata's eve.json and the target JSON file for storing DDoS IPs
EVE_FILE="/var/log/suricata/eve.json"
TARGET_JSON="ddos_ips.json"

# Temporary file for intermediate processing
TEMP_FILE=$(mktemp)

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo "jq is not installed. Please install it to run this script."
    exit 1
fi

# Extract src_ip from eve.json where the alert message matches "Possible DDoS attack"
jq -r 'select(.event_type == "alert" and .alert and .alert.signature == "Possible DDoS attack") | .src_ip' "$EVE_FILE" > "$TEMP_FILE"

# Remove duplicate IPs and format as a JSON array
jq -s 'unique' "$TEMP_FILE" > "$TARGET_JSON"

# Clean up the temporary file
rm -f "$TEMP_FILE"

echo "Unique DDoS source IPs have been written to $TARGET_JSON"
