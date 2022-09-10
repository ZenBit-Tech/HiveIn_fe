import { Button } from "antd";
import SearchWorkDrawer from "components/UI/SearchWorkDrawer/SearchWorkDrawer";
import { useState } from "react";

function SearchWork() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        View Job
      </Button>
      <SearchWorkDrawer
        visible={open}
        onClose={() => setOpen(false)}
        title="Freelance Design"
        category="Automation"
        description="Description"
        hourlyRate={10}
        skills={["Java", "React", "Nodejs"]}
        projectLenght="7 weeks"
        englishLevel="Intermediate"
        publishDate="20-20-2020"
      />
    </>
  );
}

export default SearchWork;
