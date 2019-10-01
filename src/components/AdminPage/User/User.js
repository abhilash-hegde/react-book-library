import React from 'react';
import image from '../../../../public/img/avatars/8.png';
import { Card, Icon } from 'semantic-ui-react';

const user =  ({user, onClickEvent}) => {
    console.log(user);
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
export default user;