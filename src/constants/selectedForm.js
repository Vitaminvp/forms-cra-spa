export const FIELD_TYPES = {
  TEXT: "text",
  NUMBER: "number",
  DROPDOWN: "dropdown",
  CHECKMARK: "checkmark"
};
export const FIELD_NAMES = {
  USER: "username",
  YEAR: "year",
  GENDER: "gender",
  NEWS: "news"
};

export const MIN_FIELDS = 1;
export const MAX_FIELDS = 10;

export const DEFAULT_FORM = {
  name: "New Form",
  fields: [
    {
      type: "text",
      name: "username",
      label: "enter username here",
      placeholder: "John Doe"
    },
    {
      type: "number",
      name: "year",
      label: "enter year of birth ",
      placeholder: "2006"
    },
    {
      type: "dropdown",
      name: "gender",
      label: "Gender",
      items: [
        {
          name: "Male",
          value: "m"
        },
        {
          name: "Female",
          value: "w"
        }
      ],
      default: 0
    },
    {
      type: "checkmark",
      name: "news",
      label: "get news on email"
    }
  ],
  history: [],
  rating: { votes: 0, rating: 0 }
};
