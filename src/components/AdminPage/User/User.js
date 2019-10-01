import React from 'react';
import image from '../../../../public/img/avatars/8.png';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const user =  ({user, onClickEvent}) => {
    return (
        <Card onClick={() => onClickEvent(user.userId)}
            image={user.image || image}
            header={(localStorage.userId==user.userId) ? "You": user.name||"--Not Set--"}
            meta={"Email: " + user.email}
            description={user.about||"--No info--"}
            extra={"Role: "+user.role}
        />
    );
}
user.propTypes = {
    onClickEvent: PropTypes.func,
    user: PropTypes.object
}

export default user;