import csv
import os
import cv2
import mediapipe as mp
import numpy as np


# creation of csv file for the landmarks cords
def create_landmarks_cords():
    num_cords = 543
    landmarks = ['action']
    for val in range(1, num_cords + 1):
        landmarks += ['x{}'.format(val), 'y{}'.format(val), 'z{}'.format(val), 'v{}'.format(val)]
        with open('pose_images.csv', mode='w', newline='') as f:
            csv_writer = csv.writer(f, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
            csv_writer.writerow(landmarks)


# put filename to be string and action name to be string too
def save_landmarks(filename, action_name, pose, face, hands):
    # putting the solutions into small variables to call them
    mp_drawing = mp.solutions.drawing_utils
    mp_holistic = mp.solutions.holistic

    # capturing the video applicable to change in the future
    cap = cv2.VideoCapture(filename)

    with mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:

        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            # Recolor Feed
            image = cv2.cvtColor(cv2.flip(frame, 1), cv2.COLOR_BGR2RGB)

            # make image not writeable for extra performance that doesn't exist ?
            image.flags.writeable = False

            # Make Detections
            results = holistic.process(image)
            if not os.path.isfile('pose_images.csv'):
                create_landmarks_cords()

            # make image writeable again
            image.flags.writeable = True

            # face_landmarks, pose_landmarks, left_hand_landmarks, right_hand_landmarks

            # Recolor image back to BGR for rendering
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
            # 1. Draw face landmarks
            mp_drawing.draw_landmarks(image, results.face_landmarks, mp_holistic.FACEMESH_TESSELATION,
                                      mp_drawing.DrawingSpec(color=(80, 110, 10), thickness=1, circle_radius=1),
                                      mp_drawing.DrawingSpec(color=(80, 256, 121), thickness=1, circle_radius=1)
                                      )

            # 2. Right hand
            mp_drawing.draw_landmarks(image, results.right_hand_landmarks, mp_holistic.HAND_CONNECTIONS,
                                      mp_drawing.DrawingSpec(color=(80, 22, 10), thickness=2, circle_radius=4),
                                      mp_drawing.DrawingSpec(color=(80, 44, 121), thickness=2, circle_radius=2)
                                      )

            # 3. Left Hand
            mp_drawing.draw_landmarks(image, results.left_hand_landmarks, mp_holistic.HAND_CONNECTIONS,
                                      mp_drawing.DrawingSpec(color=(121, 22, 76), thickness=2, circle_radius=4),
                                      mp_drawing.DrawingSpec(color=(121, 44, 250), thickness=2, circle_radius=2)
                                      )

            # 4. Pose Detections
            mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_holistic.POSE_CONNECTIONS,
                                      mp_drawing.DrawingSpec(color=(245, 117, 66), thickness=2, circle_radius=4),
                                      mp_drawing.DrawingSpec(color=(245, 66, 230), thickness=2, circle_radius=2)
                                      )
            # Export to CSV
            with open('pose_images.csv', mode='a', newline='') as f:
                csv_writer = csv.writer(f, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
                csv_writer.writerow(extract_landmarks(results, action_name, pose, face, hands))
    cap.release()
    cv2.destroyAllWindows()


# extract the landmarks and put zero if didn't detect the landmark
def extract_landmarks(results, action_name, pose, face, hands):
    if pose and not face and not hands:
        savedpose = np.array([[res.x, res.y, res.z, res.visibility] for res in
                              results.pose_landmarks.landmark]).flatten() if results.pose_landmarks else np.zeros(
            33 * 4)
        savedface = np.zeros(468 * 4)
        lh = np.zeros(21 * 4)
        rh = np.zeros(21 * 4)
    elif not pose and face and not hands:
        savedpose = np.zeros(33 * 4)
        savedface = np.array([[res.x, res.y, res.z, res.visibility] for res in
                              results.face_landmarks.landmark]).flatten() if results.face_landmarks else np.zeros(
            468 * 4)
        lh = np.zeros(21 * 4)
        rh = np.zeros(21 * 4)
    elif not pose and not face and hands:
        savedpose = np.zeros(33 * 4)
        savedface = np.zeros(468 * 4)
        lh = np.array([[res.x, res.y, res.z, res.visibility] for res in
                       results.left_hand_landmarks.landmark]).flatten() if results.left_hand_landmarks else np.zeros(
            21 * 4)
        rh = np.array([[res.x, res.y, res.z, res.visibility] for res in
                       results.right_hand_landmarks.landmark]).flatten() if results.right_hand_landmarks else np.zeros(
            21 * 4)
    elif pose and face and not hands:
        savedpose = np.array([[res.x, res.y, res.z, res.visibility] for res in
                              results.pose_landmarks.landmark]).flatten() if results.pose_landmarks else np.zeros(
            33 * 4)
        savedface = np.array([[res.x, res.y, res.z, res.visibility] for res in
                              results.face_landmarks.landmark]).flatten() if results.face_landmarks else np.zeros(
            468 * 4)
        lh = np.zeros(21 * 4)
        rh = np.zeros(21 * 4)
    elif pose and not face and hands:
        savedpose = np.array([[res.x, res.y, res.z, res.visibility] for res in
                              results.pose_landmarks.landmark]).flatten() if results.pose_landmarks else np.zeros(
            33 * 4)
        savedface = np.zeros(468 * 4)
        lh = np.array([[res.x, res.y, res.z, res.visibility] for res in
                       results.left_hand_landmarks.landmark]).flatten() if results.left_hand_landmarks else np.zeros(
            21 * 4)
        rh = np.array([[res.x, res.y, res.z, res.visibility] for res in
                       results.right_hand_landmarks.landmark]).flatten() if results.right_hand_landmarks else np.zeros(
            21 * 4)
    elif not pose and face and hands:
        savedpose = np.zeros(33 * 4)
        savedface = np.array([[res.x, res.y, res.z, res.visibility] for res in
                              results.face_landmarks.landmark]).flatten() if results.face_landmarks else np.zeros(
            468 * 4)
        lh = np.array([[res.x, res.y, res.z, res.visibility] for res in
                       results.left_hand_landmarks.landmark]).flatten() if results.left_hand_landmarks else np.zeros(
            21 * 4)
        rh = np.array([[res.x, res.y, res.z, res.visibility] for res in
                       results.right_hand_landmarks.landmark]).flatten() if results.right_hand_landmarks else np.zeros(
            21 * 4)
    elif pose and face and hands:
        savedpose = np.array([[res.x, res.y, res.z, res.visibility] for res in
                              results.pose_landmarks.landmark]).flatten() if results.pose_landmarks else np.zeros(
            33 * 4)
        savedface = np.array([[res.x, res.y, res.z, res.visibility] for res in
                              results.face_landmarks.landmark]).flatten() if results.face_landmarks else np.zeros(
            468 * 4)
        lh = np.array([[res.x, res.y, res.z, res.visibility] for res in
                       results.left_hand_landmarks.landmark]).flatten() if results.left_hand_landmarks else np.zeros(
            21 * 4)
        rh = np.array([[res.x, res.y, res.z, res.visibility] for res in
                       results.right_hand_landmarks.landmark]).flatten() if results.right_hand_landmarks else np.zeros(
            21 * 4)
    else:
        print("No boolean values set to True")
    row = list(np.concatenate([savedpose, savedface, lh, rh]))
    # Append action name
    row.insert(0, action_name)
    return row
