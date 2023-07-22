import csv

csvfiler = open('ratings.csv', newline='', encoding="utf8")
csvfilew = open('myratings.csv', newline='', encoding="utf8", mode="w")
reader = csv.DictReader(csvfiler)
writer = csv.DictWriter(csvfilew, fieldnames=['Your Rating','Title','URL','Title Type','IMDb Rating','Runtime (mins)','Year','Genres','Directors'], delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
writer.writeheader()
for row in reader:
    writer.writerow({'Your Rating': row['Your Rating'], 'Title': row['Title'], 'URL': row['URL'], 'Title Type': row['Title Type'], 'IMDb Rating': row['IMDb Rating'], 'Runtime (mins)': row['Runtime (mins)'], 'Year': row['Year'], 'Genres': row['Genres'], 'Directors': row['Directors']})
    print(row['Your Rating'], row['Title'], row['URL'], row['Title Type'], row['IMDb Rating'], row['Runtime (mins)'], row['Year'], row['Genres'], row['Directors'])


