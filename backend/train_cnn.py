import os
import glob
import random
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
from torchvision import transforms
from PIL import Image

ARCHIVE_PATH = r"C:\Users\riyac\Downloads\archive"
MODEL_SAVE_PATH = "breast_cancer_cnn.pth"
IMAGE_SIZE = (50, 50)
BATCH_SIZE = 64
EPOCHS = 5
NUM_SAMPLES = 4000

# -------------------------------------------------------------
# 1. CNN Model Architecture
# -------------------------------------------------------------
class BreastCancerCNN(nn.Module):
    """
    Convolutional Neural Network (CNN) for Histopathological 
    Breast Cancer (Invasive Ductal Carcinoma) Detection.
    
    Architecture:
    - Conv Block 1: Conv2D(3 -> 32, 3x3) + BatchNorm + ReLU + MaxPool(2x2)
    - Conv Block 2: Conv2D(32 -> 64, 3x3) + BatchNorm + ReLU + MaxPool(2x2)
    - Conv Block 3: Conv2D(64 -> 128, 3x3) + BatchNorm + ReLU + MaxPool(2x2)
    - AdaptiveAvgPool2D(4x4)
    - Fully Connected (Dense): Linear(2048 -> 128) + ReLU + Dropout(0.4)
    - Output: Linear(128 -> 2) [0: Benign, 1: Malignant]
    """
    def __init__(self):
        super(BreastCancerCNN, self).__init__()
        
        self.features = nn.Sequential(
            # Block 1
            nn.Conv2d(3, 32, kernel_size=3, padding=1),
            nn.BatchNorm2d(32),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=2, stride=2),
            
            # Block 2
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=2, stride=2),
            
            # Block 3
            nn.Conv2d(64, 128, kernel_size=3, padding=1),
            nn.BatchNorm2d(128),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=2, stride=2),
        )
        
        self.adaptive_pool = nn.AdaptiveAvgPool2d((4, 4))
        
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(128 * 4 * 4, 128),
            nn.ReLU(inplace=True),
            nn.Dropout(p=0.4),
            nn.Linear(128, 2)  # 2 classes: 0 = Benign, 1 = Malignant
        )
        
    def forward(self, x):
        x = self.features(x)
        x = self.adaptive_pool(x)
        x = self.classifier(x)
        return x

# -------------------------------------------------------------
# 2. Custom Dataset
# -------------------------------------------------------------
class HistopathologyDataset(Dataset):
    def __init__(self, filepaths, labels, transform=None):
        self.filepaths = filepaths
        self.labels = labels
        self.transform = transform
        
    def __len__(self):
        return len(self.filepaths)
        
    def __getitem__(self, idx):
        img_path = self.filepaths[idx]
        image = Image.open(img_path).convert("RGB")
        label = self.labels[idx]
        
        if self.transform:
            image = self.transform(image)
            
        return image, label

# -------------------------------------------------------------
# 3. Training Pipeline
# -------------------------------------------------------------
def train():
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Using device: {device}")
    
    # Collect files recursively
    search_pattern = os.path.join(ARCHIVE_PATH, "**", "*.png")
    all_files = glob.glob(search_pattern, recursive=True)
    print(f"Found {len(all_files)} total images in archive.")
    
    if len(all_files) == 0:
        print("No images found! Please check ARCHIVE_PATH.")
        return

    # Separate by class for balanced sampling
    benign_files = [f for f in all_files if os.path.basename(os.path.dirname(f)) == "0"]
    malignant_files = [f for f in all_files if os.path.basename(os.path.dirname(f)) == "1"]
    print(f"Total Benign (0): {len(benign_files)}, Total Malignant (1): {len(malignant_files)}")
    
    samples_per_class = min(NUM_SAMPLES // 2, len(benign_files), len(malignant_files))
    selected_benign = random.sample(benign_files, samples_per_class)
    selected_malignant = random.sample(malignant_files, samples_per_class)
    
    dataset_files = selected_benign + selected_malignant
    dataset_labels = [0] * len(selected_benign) + [1] * len(selected_malignant)
    
    # Shuffle together
    combined = list(zip(dataset_files, dataset_labels))
    random.seed(42)
    random.shuffle(combined)
    dataset_files, dataset_labels = zip(*combined)
    dataset_files, dataset_labels = list(dataset_files), list(dataset_labels)
    
    split_idx = int(0.8 * len(dataset_files))
    train_files, val_files = dataset_files[:split_idx], dataset_files[split_idx:]
    train_labels, val_labels = dataset_labels[:split_idx], dataset_labels[split_idx:]
    print(f"Training samples: {len(train_files)}, Validation samples: {len(val_files)}")
    
    train_transform = transforms.Compose([
        transforms.Resize(IMAGE_SIZE),
        transforms.RandomHorizontalFlip(),
        transforms.RandomVerticalFlip(),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
    
    val_transform = transforms.Compose([
        transforms.Resize(IMAGE_SIZE),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
    
    train_dataset = HistopathologyDataset(train_files, train_labels, transform=train_transform)
    val_dataset = HistopathologyDataset(val_files, val_labels, transform=val_transform)
    
    train_loader = DataLoader(train_dataset, batch_size=BATCH_SIZE, shuffle=True)
    val_loader = DataLoader(val_dataset, batch_size=BATCH_SIZE, shuffle=False)
    
    model = BreastCancerCNN().to(device)
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=0.001)
    
    print("\n--- Starting CNN Training ---")
    for epoch in range(1, EPOCHS + 1):
        model.train()
        running_loss = 0.0
        correct = 0
        total = 0
        
        for images, labels in train_loader:
            images, labels = images.to(device), labels.to(device)
            
            optimizer.zero_grad()
            outputs = model(images)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
            
            running_loss += loss.item() * images.size(0)
            _, predicted = torch.max(outputs, 1)
            total += labels.size(0)
            correct += (predicted == labels).sum().item()
            
        epoch_loss = running_loss / total
        epoch_acc = (correct / total) * 100
        
        # Validation
        model.eval()
        val_loss = 0.0
        val_correct = 0
        val_total = 0
        with torch.no_grad():
            for images, labels in val_loader:
                images, labels = images.to(device), labels.to(device)
                outputs = model(images)
                loss = criterion(outputs, labels)
                
                val_loss += loss.item() * images.size(0)
                _, predicted = torch.max(outputs, 1)
                val_total += labels.size(0)
                val_correct += (predicted == labels).sum().item()
                
        val_epoch_loss = val_loss / val_total
        val_epoch_acc = (val_correct / val_total) * 100
        
        print(f"Epoch [{epoch}/{EPOCHS}] - "
              f"Train Loss: {epoch_loss:.4f}, Train Acc: {epoch_acc:.2f}% | "
              f"Val Loss: {val_epoch_loss:.4f}, Val Acc: {val_epoch_acc:.2f}%")
              
    torch.save(model.state_dict(), MODEL_SAVE_PATH)
    print(f"\n[SUCCESS] CNN Model saved to {MODEL_SAVE_PATH}")

if __name__ == "__main__":
    train()

