FROM nginx
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./lib /usr/share/nginx/html/lib
COPY ./content /usr/share/nginx/html