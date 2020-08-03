FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./

RUN apt-get update
RUN apt-get install -y --no-install-recommends \
		vim \
		wget \
		htop \
		tmux

RUN npm install

COPY . .

EXPOSE 8080

# CMD /bin/bash
CMD ["npm", "start"]
