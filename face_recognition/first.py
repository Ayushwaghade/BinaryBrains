import cv2
import os

name = input("Enter Student Name: ")
folder_path = f"dataset/{name}"
os.makedirs(folder_path, exist_ok=True)

cap = cv2.VideoCapture(0)
count = 0

while count < 5:  # Capture 5 images per student
    ret, frame = cap.read()
    if not ret:
        break
    cv2.imshow("Capture Face", frame)
    cv2.imwrite(f"{folder_path}/{count}.jpg", frame)
    count += 1
    cv2.waitKey(500)

cap.release()
cv2.destroyAllWindows()
print(f"Images saved for {name} in dataset folder.")
