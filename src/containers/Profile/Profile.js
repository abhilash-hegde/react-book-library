import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {
    Card as OuterCard,
    CardHeader,
    CardBody,
} from 'reactstrap';
import { Visible, Row, Col } from 'react-grid-system';
import { Card, Segment, Form, Button, Image, Label } from 'semantic-ui-react';
import image from '../../../public/img/avatars/8.png';
import { Progress, Spin } from 'antd';
import * as actions from '../../store/actions';
import { successNotification } from '../../components/UI/Message/Message'

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

const Profile = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users)
    const { imgUrl, imgloading, imgProgress, imgError } = useSelector(state => ({
        imgUrl: state.images.user.url,
        imgLoading: state.images.user.loading,
        imgProgress: state.images.user.progress,
        imgError: state.images.user.error
    }), shallowEqual)
    const { updatedUser, updateLoading, updateError } = useSelector(state => ({
        updatedUser: state.users.update.user,
        updateLoading: state.users.update.loading,
        updateError: state.users.update.error
    }), shallowEqual)

    const [selectedImageUrl, setSelectedImageUrl] = useState(null);
    const [selectedImage] = useState(null);

    const [modifiedUser, setModifiedUser] = useState(null);
    const imageInput = useRef(null);

    useEffect(() => {
        setModifiedUser(users[localStorage.userId]);
        setSelectedImageUrl(users[localStorage.userId].img);
    }, [users])

    useEffect(() => {
        setModifiedUser(state => ({ ...state, img: imgUrl }));
    }, [imgUrl])

    useEffect(() => {
        successNotification("User updated succesfully!");
        setModifiedUser(state => ({ ...state, ...updatedUser }));
    }, [updatedUser])

    useEffect(() => {
        successNotification(updateError);
        setModifiedUser(state => ({ ...state, ...updatedUser }));
    }, [updateError])

    const inputChangedHandler = (event, name) => {
        const target = event.target;
        const updatedUser = {
            [name]: target.value
        };
        setModifiedUser(state => ({ ...state, ...updatedUser }));
    }

    const imageSelectedHandler = event => {
        const file = event.target.files[0];
        getBase64(file, imageUrl => {
            setSelectedImageUrl(imageUrl);
            selectedImage(file);
        });
    }

    let uploadingStatus = 'active';
    if (imgProgress == 100) {
        uploadingStatus = "success";
    }
    if (imgError) {
        uploadingStatus = "exeption";
    }
    return (
        <div className="animated fadeIn">

            <Row align="center">
                <Col align="center" xs={12} sm={6} md={4} >
                    <Card>
                        <Image src={modifiedUser.img || image} />
                        <Card.Content>
                            <Card.Header>
                                {modifiedUser.name || "--not set--"}
                            </Card.Header>
                            <Card.Meta>
                                <span className='date'>
                                    Joined in 2015
                                             </span>
                            </Card.Meta>
                            <Card.Description>
                                About you: {modifiedUser.about || "--not set--"}
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            Issued Books: {modifiedUser.books ? Object.keys(modifiedUser.books).length : 0}
                        </Card.Content>
                    </Card>
                </Col>
                <Visible xs><br /> <br /> <br /></Visible>
                <Col align="center" xs={12} sm={6} md={8}>
                    <OuterCard>
                        <CardHeader>
                            Edit Profile
                             </CardHeader>
                        <CardBody>
                            <Spin spinning={updateLoading} size="large">
                                <Form loading={false}>
                                    <Form.Group widths='equal'>
                                        <Form.Input fluid disabled label='User ID'
                                            placeholder='User ID'
                                            value={modifiedUser.userId} />
                                        <Form.Input fluid label='Role'
                                            placeholder='Role' disabled
                                            value={modifiedUser.role}
                                        />

                                        <Form.Input fluid label='Email' placeholder='Email'
                                            disabled value={modifiedUser.email} />
                                    </Form.Group>

                                    <Form.TextArea label='About' placeholder='About you...'
                                        onChange={event => inputChangedHandler(event, 'about')}
                                        value={modifiedUser.about} />

                                    <Form.Group widths='equal'>
                                        <Form.Input fluid label='Name' placeholder='Name'
                                            onChange={event => inputChangedHandler(event, 'name')}
                                            value={modifiedUser.name} />

                                    </Form.Group>
                                    <br />
                                    <input type="file"
                                        style={{ display: 'none' }}
                                        onChange={event => imageSelectedHandler(event)}
                                        ref={imageInput} />
                                    <Row>
                                        <Col align="center">
                                            <Segment style={{ width: 180 }}>
                                                <div><Image size='medium'>
                                                    {selectedImageUrl ? (<Image src={selectedImageUrl} size='small' />) : (<Label content='Image not found!' icon='warning' />)}
                                                </Image>
                                                </div>
                                                <span hidden={!imgloading} style={{ width: 170 }}><Progress percent={imgProgress || 0} size="small" status={uploadingStatus} /></span>
                                                <br />
                                                <Button size='mini' onClick={() => imageInput.current.click()}>{modifiedUser.img ? "Change" : "Add"}</Button>
                                                <Button size='mini' disabled={!selectedImage} onClick={() => dispatch(actions.uploadUserImage(selectedImage))}>Upload</Button>
                                            </Segment>
                                        </Col>
                                    </Row>
                                    <br />
                                    <br />
                                    <Row>
                                        <Col align="center" >
                                            <Button color="blue"
                                                onClick={() => dispatch(actions.updateUser(modifiedUser))}>Submit</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Spin>
                        </CardBody>
                    </OuterCard>
                </Col>
            </Row>
        </div>
    );
}

export default Profile;