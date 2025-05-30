import { Box, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import React, { ReactNode } from "react";

interface Props {
  name: string;
  component: ReactNode;
}
const ProfileNavigation = ({ tabs }: { tabs: Props[] }) => {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: { xs: "block", sm: "flex" }, mt: 4, gap: 2 }}>
      <Tabs
        orientation={isSmallScreen ? "horizontal" : "vertical"}
        value={value}
        variant={isSmallScreen ? "scrollable" : "standard"}
        scrollButtons
        allowScrollButtonsMobile
        onChange={handleChange}
        sx={{ borderRight: isSmallScreen ? 0 : 1, borderColor: "divider", pb: 4 }}
      >
        {tabs.map((tab, index) => (
          <Tab
            sx={{ pr: { xs: 0, sm: 8 }, fontSize: { xs: 16, sm: 20 }, width: "max-content" }}
            key={index}
            label={tab.name}
            {...a11yProps(index)}
          />
        ))}
      </Tabs>
      {tabs.map((tab, index) => (
        <TabPanel key={index} value={value} index={index}>
          {tab.component}
        </TabPanel>
      ))}
    </Box>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{ width: "100%" }}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default ProfileNavigation;
