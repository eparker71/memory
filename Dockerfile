# use an existing image that has apache installed
# and is already configured
# https://hub.docker.com/_/httpd/
FROM httpd:2.4

# copy the index.html file to the
# root of the new website
COPY index.html /usr/local/apache2/htdocs/
COPY memory.css /usr/local/apache2/htdocs/
COPY memory.js /usr/local/apache2/htdocs/
COPY images/coral.png /usr/local/apache2/htdocs/images/coral.png