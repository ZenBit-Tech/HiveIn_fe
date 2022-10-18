import { IEducation, IExperience } from "../../services/profileInfo/typesDef";

type TArgs = IEducation[] | IExperience[];

const parseData = (current: TArgs, queried: TArgs) => {
  const queriedId = queried.map(({ id }) => id);
  const currentId = current.map(({ id }) => id);

  const filteredId = queriedId.filter((id) => !currentId.includes(id));

  const shouldBeDeleted = filteredId.map((id) => ({
    id,
    active: false,
  }));

  return [...current, ...shouldBeDeleted];
};

export default parseData;
