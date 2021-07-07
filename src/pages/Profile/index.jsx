import { useContext, useState } from 'react';
import { FiSettings, FiUpload } from 'react-icons/fi';

import firebase from '../../services/firebaseConnection';
import { AuthContext } from '../../contexts/auth';
import Header from '../../components/Header';
import Title from '../../components/Title';
import avatar from '../../assets/avatar.png';
import './styles.css';

function Profile() {
  const { user, signOut, setUser, storageUser } = useContext(AuthContext);

  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);

  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  const [imageAvatar, setImageAvatar] = useState(null);

  function handleFile(e) {
    const image = e.target.files[0];

    if (image.type === 'image/jpeg' || image.type === 'image/png') {
      setImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(e.target.files[0]));
    } else {
      alert('Send image type of  PNG or JPEG');
      setImageAvatar(null);
      return null;
    }
  }

  async function handleUpload() {
    const currentUid = user.uid;
    const uploadTask = await firebase
      .storage()
      .ref(`images/${currentUid}/${imageAvatar.name}`)
      .put(imageAvatar)
      .then(async () => {
        await firebase
          .storage()
          .ref(`images/${currentUid}`)
          .child(imageAvatar.name)
          .getDownloadURL()
          .then(async (url) => {
            let urlPhoto = url;
            await firebase
              .firestore()
              .collection('users')
              .doc(user.uid)
              .update({
                avatarUrl: urlPhoto,
                name: name,
              })
              .then(() => {
                let data = {
                  ...user,
                  avatarUrl: urlPhoto,
                  name: name,
                };
                setUser(data);
                storageUser(data);
              });
          });
      });
  }

  async function handleSave(e) {
    e.preventDefault();

    if (imageAvatar === null && name !== '') {
      await firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .update({
          name: name,
        })
        .then(() => {
          let data = { ...user, name: name };
          setUser(data);
          storageUser(data);
        });
    } else if (name !== '' && imageAvatar !== null) {
      handleUpload();
    }
  }

  return (
    <div>
      <Header />
      <div className="content">
        <Title name="My Profile">
          <FiSettings size={25} />
        </Title>
        <div className="content2">
          <div className="container1">
            <form className="form-profile" onSubmit={handleSave}>
              <div>
                <label className="label-avatar">
                  <span>
                    <FiUpload color="#FFF" size={25} />
                  </span>
                  <input type="file" accept="image/*" onChange={handleFile} />
                  {avatarUrl === null ? (
                    <img
                      src={avatar}
                      width="280"
                      height="280"
                      alt="User photo profile"
                    />
                  ) : (
                    <img
                      src={avatarUrl}
                      width="280"
                      height="280"
                      alt="User photo profile"
                    />
                  )}
                </label>
              </div>

              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label>E-mail</label>
              <input type="text" value={email} disabled={true} />

              <button type="submit">Save</button>
            </form>
          </div>
          <div className="container1">
            <button className="logout" onClick={() => signOut()}>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
