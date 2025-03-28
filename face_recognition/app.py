from flask import Flask, render_template, request, redirect, url_for, jsonify
import cv2
import os
import face_recognition
import pickle
import datetime

app = Flask(__name__)

DATASET_DIR = "dataset"
ENCODINGS_FILE = "encodings.pickle"

# Ensure dataset directory exists
os.makedirs(DATASET_DIR, exist_ok=True)

# Attendance log
attendance_log = {}

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        name = request.form["name"]
        folder_path = os.path.join(DATASET_DIR, name)
        os.makedirs(folder_path, exist_ok=True)

        cap = cv2.VideoCapture(0)
        count = 0
        while count < 5:
            ret, frame = cap.read()
            if not ret:
                break
            cv2.imshow("Capture Face", frame)
            cv2.imwrite(f"{folder_path}/{count}.jpg", frame)
            count += 1
            cv2.waitKey(500)

        cap.release()
        cv2.destroyAllWindows()
        return redirect(url_for("encode_faces"))
    
    return render_template("register.html")

@app.route("/encode_faces")
def encode_faces():
    known_faces = []
    known_names = []

    for student in os.listdir(DATASET_DIR):
        student_folder = os.path.join(DATASET_DIR, student)
        for img_name in os.listdir(student_folder):
            img_path = os.path.join(student_folder, img_name)
            img = face_recognition.load_image_file(img_path)
            encoding = face_recognition.face_encodings(img)
            if encoding:
                known_faces.append(encoding[0])
                known_names.append(student)

    with open(ENCODINGS_FILE, "wb") as f:
        pickle.dump((known_faces, known_names), f)

    return redirect("/")

@app.route("/recognize_faces")
def recognize_faces():
    cap = cv2.VideoCapture(0)

    with open(ENCODINGS_FILE, "rb") as f:
        known_faces, known_names = pickle.load(f)

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        face_locations = face_recognition.face_locations(rgb_frame)
        face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)

        for face_encoding in face_encodings:
            matches = face_recognition.compare_faces(known_faces, face_encoding, tolerance=0.6)
            name = "Unknown"

            if True in matches:
                matched_idx = matches.index(True)
                name = known_names[matched_idx]

                if name not in attendance_log:
                    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                    attendance_log[name] = timestamp
                    print(f"{name} marked present at {timestamp}")

        cv2.imshow("Face Recognition", frame)
        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

    cap.release()
    cv2.destroyAllWindows()

    return redirect(url_for("attendance"))

@app.route("/attendance")
def attendance():
    return render_template("attendance.html", attendance_log=attendance_log)

if __name__ == "__main__":
    app.run(debug=True)
