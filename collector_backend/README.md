# collector_backend
 In short hands, the backend is built using flask. 
 it cotnains two APIs:
- `'/display-data'`: it returns the whole data exist in database.sqlite (which we provide it) to the frontend.
- `'/upload-data'`: take user's video and passed to the a part of our AI model to exteract landmarks for the action selected.
