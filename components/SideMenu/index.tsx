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
          <ListItemButton onClick={() => router.push('/')}>
            <ListItemText primary="HOME" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push('/user')}>
            <ListItemText primary="user" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push('/animal')}>
            <ListItemText primary="animal" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push('/monster')}>
            <ListItemText primary="monster" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push('/villager')}>
            <ListItemText primary="villager" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push('/village')}>
            <ListItemText primary="village" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push('/pillager')}>
            <ListItemText primary="pillager" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push('/gang')}>
            <ListItemText primary="gang" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push('/item')}>
            <ListItemText primary="item" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="enchantment" onClick={() => router.push('/enchantment')}/>
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="block" onClick={() => router.push('/block')}/>
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="chunk" onClick={() => router.push('/chunk')}/>
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="chest" onClick={() => router.push('/chest')}/>
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="ender_chest" onClick={() => router.push('/ender_chest')}/>
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="user_storage" onClick={() => router.push('/user_storage')}/>
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={handleBack}>
            <ListItemText primary="close" />
          </ListItemButton>
        </ListItem>
        <Divider />
      </List>
    </Box>
  )
};

export default SideMenu;