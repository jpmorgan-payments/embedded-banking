#!/bin/bash

# Check if an argument is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <your_argument>"
  exit 1
fi
# Access the first command-line argument
file_name="$1"

# Check if an argument is provided
if [ -z "$2" ]; then
  echo "Usage: $0 <your_argument>"
  exit 1
fi
# Access the first command-line argument
output_file="./${2}.csv"

# Specify the input file names
file1="1.csv"
file2=$(find "./" -type f -name "*-$file_name" -print -quit)

# Specify the output file name

cp "$output_file" "$file1"

# Check if the output file already exists and remove it
if [ -e "$output_file" ]; then
  rm "$output_file"
fi



# Copy the header from the first file to the output file
head -n 1 "$file1" > "$output_file"
# Use awk to merge the files, taking the row from the newer file in case of duplicates
awk -F, 'NR==FNR && FNR>1 {a[$2]=$0; next} FNR>1 {a[$2]=$0} END {for (i in a) print a[i]}' "$file1" "$file2" >> "$output_file"

echo "Files merged successfully. Output file: $output_file"
echo "Sorting Output file..."

# Check if the file exists
if [ ! -f "$output_file" ]; then
  echo "Error: File '$output_file' not found."
  exit 1
fi

# Sort the CSV file by the second column (date)
sorted_csv_file="./${2}-sorted.csv"
if [ -e "$sorted_csv_file" ]; then
  rm "$sorted_csv_file"
fi
{ head -n 1 "$output_file"; tail -n +2 "$output_file" | sort -t ',' -k2,2; } > "$sorted_csv_file"

echo "CSV file sorted by date. Output file: $sorted_csv_file"


if [ -e "$file1" ]; then
  rm "$file1"
fi
if [ -e "$file2" ]; then
  rm "$file2"
fi