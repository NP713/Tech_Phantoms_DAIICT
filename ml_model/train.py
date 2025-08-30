# 🌿 MANGROVE CUTTING DETECTOR - CLEAN VERSION
# Uses your 4 correct folders: cut_mangrove, not_cut_mangrove, cut_other, not_cut_other

import os
import numpy as np
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D
from tensorflow.keras.models import Model
from sklearn.utils.class_weight import compute_class_weight
from google.colab import files

print("🔍 Checking dataset...")

# Step 1: Verify folders
DATASET_PATH = 'data/dataset'

if not os.path.exists(DATASET_PATH):
    print("❌ Folder 'data/dataset' not found. Upload your dataset first.")
else:
    print("✅ Dataset found!")
    print("📊 Distribution:")
    classes = sorted(os.listdir(DATASET_PATH))
    for cls in classes:
        if cls.startswith('.'):  # Skip hidden
            continue
        count = len([f for f in os.listdir(f"{DATASET_PATH}/{cls}") if f.lower().endswith(('.jpg', '.jpeg', '.png'))])
        print(f"  {cls}: {count} images")

# Step 2: Data generator
datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    horizontal_flip=True,
    zoom_range=0.2,
    validation_split=0.2
)

train_gen = datagen.flow_from_directory(
    DATASET_PATH,
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical',
    subset='training'
)

val_gen = datagen.flow_from_directory(
    DATASET_PATH,
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical',
    subset='validation'
)

print("✅ Data generators ready!")
print("Classes:", train_gen.class_indices)

# Step 3: Class weights (handle imbalance)
y_train = train_gen.classes
class_weights = compute_class_weight('balanced', classes=np.unique(y_train), y=y_train)
class_weight_dict = dict(enumerate(class_weights))
print("⚖ Class weights:", class_weight_dict)

# Step 4: Build model
base_model = MobileNetV2(weights='imagenet', include_top=False, input_shape=(224,224,3))
base_model.trainable = False

x = GlobalAveragePooling2D()(base_model.output)
x = Dense(128, activation='relu')(x)
outputs = Dense(len(train_gen.class_indices), activation='softmax')(x)

model = Model(base_model.input, outputs)
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])


print("✅ Model built!")

# Step 5: Train
print("🚀 Training...")
history = model.fit(
    train_gen,
    epochs=10,
    validation_data=val_gen,
    class_weight=class_weight_dict
)

# Step 6: Save & download
model.save('mangrove_detector_model.h5')
files.download('mangrove_detector_model.h5')
print("🎉 Model trained and downloaded!")