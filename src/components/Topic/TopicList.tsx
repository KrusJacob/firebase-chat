import { Box, Tabs, Tab } from "@mui/material";
import { topicsCollection } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useEffect, useState } from "react";
import { query } from "firebase/firestore";
import Loader from "../UI/Loader/Loader";

const TopicList = ({ onSelectTopic }: { onSelectTopic: (topicId: string) => void }) => {
  const topicsQuery = query(topicsCollection);
  const [topics, loading, error] = useCollectionData(topicsQuery);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    if (topics && topics.length > 0) {
      onSelectTopic(topics[0].id);
    }
  }, [topics, onSelectTopic]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    if (topics) {
      onSelectTopic(topics[newValue].id);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ mt: 1, width: "100%" }}>
      <Tabs
        variant="scrollable"
        scrollButtons="auto"
        textColor="inherit"
        value={selectedTab}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        {topics?.map((topic) => (
          <Tab label={topic.title} key={topic.id} />
        ))}
      </Tabs>
    </Box>
  );
};

export default TopicList;
