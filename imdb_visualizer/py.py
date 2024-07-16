import csv

def clean_csv():
    input_file = "imdb_data.csv"
    output_file = "movie.csv"

    with open(input_file, 'r', newline='', encoding='utf-8') as infile, \
         open(output_file, 'w', newline='', encoding='utf-8') as outfile:
        
        reader = csv.DictReader(infile)
        fieldnames = ['title', 'imdbRating', 'personalRating', 'genres', 'imdbId', 'year']
        writer = csv.DictWriter(outfile, fieldnames=fieldnames)
        
        writer.writeheader()
        
        for row in reader:
            cleaned_row = {
                'title': row['Title'],
                'imdbRating': row['IMDb Rating'],
                'personalRating': row['Your Rating'],
                'genres': row['Genres'],
                'imdbId': row['Const'],
                'year': row['Year']
            }
            writer.writerow(cleaned_row)

    print(f"Cleaned CSV file has been saved to {output_file}")

if __name__ == "__main__":
    clean_csv()