FROM ubuntu:latest
# The above instruction provides us a baseline image that we can extend

ADD https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/59.png /images
# The ADD instruction can download files from a url or copy from the host machine

COPY ./testfile.txt /tmp
# The COPY instruction simply copies files from the host machine

# We do not need a CMD or ENTRYPOINT instruction because
# we can inherit the instruction from the parent image