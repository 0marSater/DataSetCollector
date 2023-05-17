# collector_backend
 In short hands, the backend is built using flask. 
 it cotnains two APIs:
- `'/display-data'`: it returns the whole data exist in database.sqlite (which we provide it) to the frontend.
- `'/upload-data'`: take user's video and passed to the a part of our AI model to exteract landmarks for the action selected.

Dockerfile
----------
- The base image i used is __python:3.10-slim-buster__
- install specific libraries that cannot be inculded in requirements.txt like  __opencv-python__
 __libsm6 libxext6 ffmpeg libfontconfig1 libxrender1 libgl1-mesa-glx__.
 - Expose port __5000__ which is flask default port, this port can be override with any port by passing it as an arugment port=x in run command.
