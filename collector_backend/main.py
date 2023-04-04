from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_uploads import UploadSet, configure_uploads

from AI import *

app = Flask(__name__)
cors = CORS(app)

# take the path of the project
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'dataBase.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOADED_VIDEOS_DEST'] = 'videos\\'

app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024

dataBase = SQLAlchemy(app)

videos = UploadSet('videos', extensions=('mp4', 'mov', 'avi'))

# Configure the UploadSet

configure_uploads(app, videos)


class VideoData(dataBase.Model):
    id = dataBase.Column(dataBase.Integer, primary_key=True)
    action = dataBase.Column(dataBase.String(100), nullable=False)
    context = dataBase.Column(dataBase.String(255), nullable=False)
    meaning_front = dataBase.Column(dataBase.String(255), nullable=True)
    meaning_ai = dataBase.Column(dataBase.String(255), nullable=True)
    pose = dataBase.Column(dataBase.Boolean, nullable=True)
    face = dataBase.Column(dataBase.Boolean, nullable=True)
    hand = dataBase.Column(dataBase.Boolean, nullable=True)
    video = dataBase.Column(dataBase.String(255), nullable=False)


with app.app_context():
    dataBase.create_all()
    # dataBase.drop_all()


@app.route('/display-data', methods=['GET'])
def get_data():
    data = VideoData.query.all()
    allRows = []
    for row in data:
        allRows.append({
            'id': row.id,
            'action': row.action,
            'context': row.context,
            'meaning': row.meaning_front,
            'video': row.video
        })
    return jsonify({
        'Data': {
            'response_data': allRows
        }
    })


@app.route('/upload-data', methods=['POST'])
def get_video():
    _video_file = request.files['video']
    _action = request.form['action']
    # assign name of action to be a name of the folder
    directory_name = _action
    _pose = get_pose(_action)
    _face = get_face(_action)
    _hand = get_hand(_action)
    # folder parameter is for check if folder path(action folder) exist or not, if isn't then create
    file_name = videos.save(_video_file, folder=directory_name)
    _full_path = basedir + '\\' + app.config['UPLOADED_VIDEOS_DEST'] + file_name
    save_landmarks(_full_path, _action, _pose, _face, _hand)
    return "ok"


def get_pose(_action):
    pose_tuple = VideoData.query.filter_by(action=_action).with_entities(VideoData.pose).first()
    pose_bool = pose_tuple[0]
    return pose_bool


def get_face(_action):
    face_tuple = VideoData.query.filter_by(action=_action).with_entities(VideoData.face).first()
    face_bool = face_tuple[0]
    return face_bool


def get_hand(_action):
    hand_tuple = VideoData.query.filter_by(action=_action).with_entities(VideoData.hand).first()
    hand_bool = hand_tuple[0]
    return hand_bool


if __name__ == '__main__':
    # in case of overriding the internal default port 5000
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, port=port, host='0.0.0.0')
