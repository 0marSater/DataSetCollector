
FROM python:3.10-slim-buster

WORKDIR /app

RUN pip install -U opencv-python
RUN apt update && apt install -y libsm6 libxext6 ffmpeg libfontconfig1 libxrender1 libgl1-mesa-glx

COPY . /app

#install the depe
RUN pip install -r requirements.txt

# Expose the port that the application will listen on
EXPOSE 5000

# Start the application using the command passed in from the docker run command
CMD ["sh", "-c", "PORT=${PORT:-5000} python main.py"]
