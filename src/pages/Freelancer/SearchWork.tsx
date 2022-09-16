import { Button } from "antd";
import SearchWorkDrawer from "components/UI/drawers/SearchWorkDrawer/SearchWorkDrawer";
import { useState } from "react";
import { useGetOneJobPostQuery } from "services/jobPosts/setJobPostsAPI";

function SearchWork() {
  const [open, setOpen] = useState(false);
  const { data, isSuccess } = useGetOneJobPostQuery({
    id: 422,
  });

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        View Job
      </Button>
      {isSuccess && (
        <SearchWorkDrawer
          visible={open}
          onClose={() => setOpen(false)}
          {...data}
        />
      )}
    </>
  );
}

export default SearchWork;
