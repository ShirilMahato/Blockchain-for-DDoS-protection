#!/usr/bin/env bash

# Paths to Suricata's eve.json and the target JSON file for storing extracted IPs
EVE_FILE="/var/log/suricata/eve.json"
TARGET_JSON="ddos_ips.json"

# Ensure jq is installed
if ! command -v jq &> /dev/null; then
    echo "jq is not installed. Please install it to run this script."
    exit 1
fi

# Check if EVE_FILE exists and is readable
if [ ! -f "$EVE_FILE" ] || [ ! -r "$EVE_FILE" ]; then
    echo "Error: The log file $EVE_FILE does not exist or cannot be read."
    exit 1
fi

# Extract and store unique source IPs in JSON array format
echo "Starting extraction..."
grep '"signature":"High TCP traffic volume detected"' "$EVE_FILE" | jq -r 'select(.event_type == "alert") | .src_ip' | sort -u | jq -R . | jq -s . > "$TARGET_JSON"
echo "Extraction completed."

# Verify output
if [ ! -s "$TARGET_JSON" ]; then
    echo "No IP addresses were extracted. Please check the structure of $EVE_FILE."
else
    echo "Unique source IPs from all alerts have been written to $TARGET_JSON"
fi