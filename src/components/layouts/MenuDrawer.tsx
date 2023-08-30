import React, { useContext, useMemo, useState } from "react";
import {
  Divider,
  Drawer,
  ListItem,
  ListItemButton,
  SxProps,
  Tab,
  Tabs,
  Theme,
} from "@mui/material";
import {
  Bookmark as BookmarkIcon,
  History as HistoryIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList, ListChildComponentProps, areEqual } from "react-window";
import AppContext, { parseUrlToMarquee } from "../../AppContext";
import memoizeOne from "memoize-one";

interface MenuDrawerProps {
  open: boolean;
  onClose: () => void;
}

const Row = React.memo(
  ({ style, index, data: { items } }: ListChildComponentProps) => {
    const navigate = useNavigate();
    const { removeEntry } = useContext(AppContext);
    const marquee = parseUrlToMarquee(items[index]);

    return (
      <ListItem style={style}>
        <ListItemButton
          onClick={() => navigate(items[index])}
          disableRipple
          sx={{
            width: "80%",
            font: marquee.font,
            color: marquee.color,
            backgroundColor: marquee.bgColor,
            whiteSpace: "nowrap",
            overflow: "clip",
          }}
        >
          {marquee.text}
        </ListItemButton>
        <ListItemButton onClick={() => removeEntry(items[index])}>
          <ClearIcon />
        </ListItemButton>
      </ListItem>
    );
  },
  areEqual,
);

const createEntryData = memoizeOne((items) => ({ items }));

const MenuDrawer = ({ open, onClose }: MenuDrawerProps) => {
  const [tab, setTab] = useState<"recent" | "saved">("recent");
  const { savedEntries, recentEntries } = useContext(AppContext);

  const entries = useMemo(
    () => createEntryData(tab === "saved" ? savedEntries : recentEntries),
    [tab, savedEntries, recentEntries],
  );

  const modalProps = useMemo(() => {
    return {
      onClose,
    };
  }, [onClose]);

  const paperProps = useMemo(() => {
    return { sx: drawerSx };
  }, []);

  return (
    <Drawer
      open={open}
      onClose={(_, reason) => {
        console.log(reason);
      }}
      ModalProps={modalProps}
      PaperProps={paperProps}
      anchor="left"
    >
      <Tabs value={tab} onChange={(_, v) => setTab(v)}>
        <Tab value="recent" label={<HistoryIcon />} />
        <Tab value="saved" label={<BookmarkIcon />} />
      </Tabs>
      <Divider />
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            itemCount={
              tab === "saved" ? savedEntries.length : recentEntries.length
            }
            itemData={entries}
            height={height}
            width={width}
            itemSize={56}
          >
            {Row}
          </FixedSizeList>
        )}
      </AutoSizer>
    </Drawer>
  );
};

export default MenuDrawer;

const drawerSx: SxProps<Theme> = {
  height: "100vh",
  width: "80%",
  maxWidth: "320px",
};
