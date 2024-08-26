#!/bin/bash

# Define the input CSV file
INPUT_FILE="../traffic-stats-sorted.csv"
OUTPUT_FILE="./data/monthly_traffic_stats.csv"

# Check if the input file exists
if [[ ! -f $INPUT_FILE ]]; then
    echo "Error: Input file '$INPUT_FILE' not found!"
    exit 1
fi

# Check if the month argument is provided
if [[ -z $1 ]]; then
    echo "Error: No month specified. Please provide a month in the format YYYY-MM (e.g., 2024-07)."
    exit 1
fi

# Get the specified month from the command-line argument
SPECIFIED_MONTH=$1

# Initialize counters for the specified month's statistics
total_views=0
total_unique_viewers=0
repository_name=""


# Process the input file to collate data just for the specified month
while IFS=, read -r repo_name date views unique_visitors; do
    # Skip the header line
    if [[ $repo_name == "repository_name" ]]; then
        continue
    fi

    # Trim whitespace and check if the date matches the specified month
    if [[ $date == $SPECIFIED_MONTH-* ]]; then
        # Convert views and unique_visitors to integers
        views=$(echo "$views" | tr -d '[:space:]')
        unique_visitors=$(echo "$unique_visitors" | tr -d '[:space:]')

        # Sum up the views and unique viewers
        total_views=$((total_views + views))
        total_unique_viewers=$((total_unique_viewers + unique_visitors))
        repository_name=$repo_name
    fi
done < "$INPUT_FILE"

# Prepare the new line to add or update
new_line="$repository_name,$SPECIFIED_MONTH,$total_views,$total_unique_viewers"

# Check if the output file exists
if [[ -f $OUTPUT_FILE ]]; then
    # Check if the specified month is already in the output file
    if grep -q "^$repository_name,$SPECIFIED_MONTH," "$OUTPUT_FILE"; then
        # If the month exists, overwrite the line with updated data using awk
        awk -v new_line="$new_line" -F, -v OFS=, '
        BEGIN {updated=0} 
        $1 == "'"$repository_name"'" && $2 == "'"$SPECIFIED_MONTH"'" {
            print new_line; 
            updated=1; 
            next
        }
        {print}
        END {if (!updated) print new_line}
        ' "$OUTPUT_FILE" > "${OUTPUT_FILE}.tmp" && mv "${OUTPUT_FILE}.tmp" "$OUTPUT_FILE"
    else
        # If the month does not exist, append the new data to the file
        echo "$new_line" >> "$OUTPUT_FILE"
    fi
else
    # If the output file does not exist, create it with headers
    echo "repository_name,month,views,unique_views" > "$OUTPUT_FILE"
    echo "$new_line" >> "$OUTPUT_FILE"
fi

echo "Statistics for $SPECIFIED_MONTH have been updated in '$OUTPUT_FILE'."
