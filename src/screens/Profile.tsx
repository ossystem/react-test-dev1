import React from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import avatar from '../assets/avatar.png';

export interface ProfileProps {
  name: string,
}

export default connect(
  (state) => (state),
)((props: ProfileProps) => {
  const { name } = props;
  return(
    <div>
      <Avatar src={avatar} style={{width: 200, height: 200}} />
      <Typography color="textPrimary">
        {`Добро пожаловать ${name}`!!!}
      </Typography>
    </div>
  );
});