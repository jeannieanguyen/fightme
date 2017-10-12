FROM node:boron
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/

# Make ssh dir
#RUN mkdir /root/.ssh/

# Copy over private key, and set permissions
#ADD id_rsa /root/.ssh/id_rsa

# Create known_hosts
#RUN touch /root/.ssh/known_hosts

# Add bitbuckets key
#RUN ssh-keyscan github.com  >> /root/.ssh/known_hosts

RUN npm install
COPY . /usr/src/app
EXPOSE 3000
CMD ["npm", "start"]
