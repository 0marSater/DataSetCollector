#FROM python:3.10-slim-buster
#
#RUN apt-get install -y libgl1-mesa-glx libglib2.0-0 libgthread2.0-0
#
#WORKDIR /app
#
#COPY . /app
#
#RUN pip install -r requirements.txt
#
#EXPOSE 5000
#
#CMD python ./main.py


FROM ubuntu:20.04

RUN apt-get update && \
    apt-get install -y libgl1-mesa-glx libglib2.0-0 libgthread2.0-0 python3 python3-pip

WORKDIR /app

COPY . /app

RUN pip3 install -r requirements.txt

EXPOSE 5000

CMD python3 ./main.py
