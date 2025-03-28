import face_recognition
import os
import pickle

known_faces = []
known_names = []

dataset_path = "dataset"
for student in os.listdir(dataset_path):
    student_folder = os.path.join(dataset_path, student)
    for img_name in os.listdir(student_folder):
        img_path = os.path.join(student_folder, img_name)
        img = face_recognition.load_image_file(img_path)
        encoding = face_recognition.face_encodings(img)
        if encoding:
            known_faces.append(encoding[0])
            known_names.append(student)

# Save Encodings
with open("encodings.pickle", "wb") as f:
    pickle.dump((known_faces, known_names), f)

print("Face encodings saved successfully.")
