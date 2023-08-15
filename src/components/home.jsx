import React, { useState } from "react";
import Navbar from "./homepage";
import "./style.css";
import { ref, uploadBytesResumable, getDownloadURL,   } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from "../FirebaseConfi";
import { Link } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useUserAuth } from "../context/UserAuthContextProvider";
// import AddCircleIcon from '@mui/icons-material/AddCircle';

function Home() {
  
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const {user}=useUserAuth();
  const [newAd, setNewAd] = useState({
    title: "",
    type: "",
    description: "",
    image: null,
  });
  const [ads, setAds] = useState([
    {
      title: "Car Ad 1",
      type: "Cars",
      description: "This is a car ad description.",
    },
    {
      title: "Mobile Ad 1",
      type: "Mobiles",
      description: "This is a mobile ad description.",
    },
    {
      title: "Computer Ad 1",
      type: "Computers",
      description: "This is a computer ad description.",
    },
    // Add more ads data
  ]);

  const handleSell = () => {
    setAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
    setNewAd({
      title: "",
      type: "",
      description: "",
      image: null,
    });
  };

  const handleAddAd = () => {
    setAds([...ads, newAd]);
    handleAddDialogClose();
    if (newAd.image) {
      const metadata = {
        contentType: "image/jpeg",
      };

      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage, "images/" + newAd.image.name);
      const uploadTask = uploadBytesResumable(
        storageRef,
        newAd.image,
        metadata
      );

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
            default:
              break;
          }
        },
        async () => {
          // Upload completed successfully, now we can get the download URL
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUrl(downloadURL);
            console.log(imageUrl);
            addAdsData();
          })
        }
      );
    }
    
    
  };
  const addAdsData = (async()=>{
    const adsInfo={
      title: newAd.title,
      desc: newAd.description,
      UserId: user.uid,
      image: imageUrl,
    }
    try{
      await addDoc(collection(db, 'adsData'), adsInfo);
      console.log("Ads added");

    }catch(err){
      console.log("error adding ads", err);
    }
  })
  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setNewAd({ ...newAd, image: selectedImage });  
  };
  

  return (
    <>
    <Navbar onSell={handleSell} />
    <div className="Home">
      
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className="front-page-header">
            <h3>Welcome to Our Marketplace</h3>
            <p>Find the best deals on cars, mobiles, computers, and more.</p>
          </div>
        </Grid>
        {ads.map((ad, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <Card className="box">
              <CardContent>
                <Typography variant="h6" color="primary">
                  {ad.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {ad.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Type: {ad.type}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
    <Dialog open={isAddDialogOpen} onClose={handleAddDialogClose}>
      <DialogTitle>Add New Ad</DialogTitle>
      <DialogContent>
          <TextField
            label="Title"
            value={newAd.title}
            onChange={(e) => setNewAd({ ...newAd, title: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Type"
            value={newAd.type}
            onChange={(e) => setNewAd({ ...newAd, type: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Description"
            value={newAd.description}
            onChange={(e) =>
              setNewAd({ ...newAd, description: e.target.value })
            }
            fullWidth
            multiline
            rows={4}
            margin="dense"
          />
          <label>
            Image:
            <input type="file" onChange={handleImageChange} accept="image/*" />
          </label>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleAddDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddAd} color="primary">
            Add Ad
          </Button>
          <Link to="/chat">
          <Button variant="contained" color="primary">
            Chat
          </Button>
        </Link>
        
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Home;
