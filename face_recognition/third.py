import face_recognition
import cv2
import pickle
import datetime

# Load stored encodings
with open("encodings.pickle", "rb") as f:
    known_faces, known_names = pickle.load(f)

attendance_log = {}

cap = cv2.VideoCapture(0)

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

            # Mark attendance if not already marked
            if name not in attendance_log:
                timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                attendance_log[name] = timestamp
                print(f"{name} marked present at {timestamp}")

    # Show the webcam feed
    cv2.imshow("Face Recognition", frame)
    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()

print("\nFinal Attendance Log:")
for student, time in attendance_log.items():
    print(f"{student} - {time}")
