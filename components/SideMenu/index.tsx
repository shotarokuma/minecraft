import React from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

type Props = {
  toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  setOpen: (value: boolean) => void;
};

const SideMenu: React.FC<Props> = ({
  toggleDrawer,
  setOpen
}) => {
  const router = useRouter();

  const handleUser = () => {
    router.push('/user');
  }

  const handleBack = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{ width: 250 }}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleUser}>
            <ListItemText primary="user" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="block" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="monster" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleBack}>
            <ListItemText primary="back" />
          </ListItemButton>
        </ListItem>
        <Divider />
      </List>
    </Box>
  )
};

export default SideMenu;