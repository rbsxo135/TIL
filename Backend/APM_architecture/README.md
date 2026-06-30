# Wordpress Webpage with APM Structure  

## Concept
- Build Web Page with one of the most well-known architecture, APM
- Apache - PHP-FPM - MariaDB
- Host classic website, Wordpress

## Trouble-shooting
- I set domain name "blog.resume.com". But that domain really exists so I had to change domain name
- After I changed config of apache server and php, a problem occured  
	&rightarrow; Every button directed to www.blog.resume.com, previous domain
- I thought that information of previous webpage still existed  
	&rightarrow; I re-installed a wordpress webpage in /var/www/blog.resume.local/public_html, but the problem wasn't solved  
	&rightarrow; I dropped the database of previous webpage and recreated, then the problem was solved
- From previous step, I figured out that wordpress left the information of webpage in DB  
	&rightarrow; This is quite normal in other web application

