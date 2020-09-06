import React, { useState, useRef, useEffect } from "react";
import {
  Input,
  InputAdornment,
  ButtonBase,
  Menu,
  MenuItem,
  makeStyles,
  Chip,
  Icon,
  FormHelperText,
  Avatar,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import PropTypes from "prop-types";
import ClearIcon from "@material-ui/icons/Clear";
import CheckBoxOutlineBlankOutlinedIcon from "@material-ui/icons/CheckBoxOutlineBlankOutlined";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import green from "@material-ui/core/colors/green";
import classNames from "classnames";

const useStyles = makeStyles((theme) => ({
  selectedItemsWrapper: {
    display: "flex",
    flex: 1,
    flexWrap: "wrap",
  },
  selectedList: {
    listStyle: "none",
    padding: "3px 0",
  },
  checkBox: {
    color: green["600"],
  },
  chip: {
    marginRight: "0.5em",
  },
  Menupaper: {
    overflowY: "hidden !important",
  },
  artwork: {
    width: "1em",
    height: "1em",
    marginLeft: "3px",
    marginRight: "5px",
  },
}));

function Dropdown(Props) {
  const [open, setOpen] = useState(false);
  const [filteredValues, setFilteredValues] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  const inputRef = useRef();
  const wrapperRef = useRef();
  const classes = useStyles();

  const {
    fullWidth,
    searchPlaceHolder,
    searchable,
    data,
    onItemClick,
    itemId,
    itemLabel,
    multiple,
    showAllButton,
    simpleValue,
    itemValue,
    onDeleteItem,
    searchByValue,
    disabled,
    error,
    errorText,
    customStyles,
    selectedValues,
    showImage,
    imageLabel,
  } = Props;

  useEffect(() => {
    if (multiple && showAllButton) {
      data.unshift({ [itemId]: -1, [itemLabel]: "All" });
    }
    const values =
      !multiple && selectedValues.length > 1
        ? selectedValues.filter((_, i) => i === 0)
        : selectedValues.concat();
    setSelectedItems(values);
    setFilteredValues(data);
  }, [data]);

  const handleClose = () => {
    setOpen(false);
    handleSearchKeyword("");
  };

  const onItemSelect = async (item) => {
    let selected = selectedItems;
    let isAllSelected = false;
    if (multiple) {
      if (item[itemId] === -1) {
        item = filteredValues.filter((v) => v[itemId] !== -1);
        isAllSelected = true;
      }
      if (
        isAllSelected &&
        item.length === selectedItems.filter((v) => v[itemId] !== -1).length
      ) {
        selected = [];
      } else if (isItemSelected(item)) {
        selected = selected.filter((v) => v[itemId] !== item[itemId]);
        populateDeletedValue(item);
      } else {
        selected = isAllSelected ? item : [...selectedItems, item];
      }
    } else {
      selected = [item];
    }
    setSelectedItems(selected);
    populateSelectedValues(selected);
    if (!multiple) {
      handleClose();
    }
  };

  const handleRemoveItem = (item) => {
    const filteredSelectedItems = selectedItems.filter(
      (v) => v[itemId] !== item[itemId]
    );
    setSelectedItems(filteredSelectedItems);
    populateSelectedValues(filteredSelectedItems);
    populateDeletedValue(item);
  };

  const removeAllSelectedItems = () => {
    setSelectedItems([]);
    populateSelectedValues([]);
  };

  const isItemSelected = (item) => {
    if (
      item[itemId] === -1 &&
      selectedItems.length === data.filter((v) => v[itemId] !== -1).length
    ) {
      return true;
    }
    return selectedItems.filter((v) => v[itemId] === item[itemId]).length > 0;
  };

  const populateSelectedValues = (values) => {
    let valuesToPopulate;

    if (values && values.length === 0) {
      valuesToPopulate = simpleValue ? null : [];
    } else {
      valuesToPopulate = simpleValue ? values.map((v) => v[itemValue]) : values;
      valuesToPopulate = multiple ? valuesToPopulate : valuesToPopulate[0];
    }
    onItemClick(valuesToPopulate);
  };

  const populateDeletedValue = (item) => {
    const deletedValue = simpleValue ? item[itemValue] : item;
    onDeleteItem(deletedValue);
  };

  const handleSearch = (keyword) => {
    let filtredResult = data.filter((v) =>
      v[searchByValue].toString().toLowerCase().includes(keyword)
    );
    const ignoreResult = data.filter((v) => v[itemId] === -1);
    if (JSON.stringify(filtredResult) === JSON.stringify(ignoreResult)) {
      filtredResult = [];
    }
    setFilteredValues(filtredResult);
  };

  const handleSearchKeyword = (keyword) => {
    setSearchKeyword(keyword);
    handleSearch(keyword);
  };

  const searchSection = () =>
    searchable && (
      <div>
        <Input
          fullWidth
          placeholder={searchPlaceHolder}
          value={searchKeyword}
          onChange={(e) => {
            handleSearchKeyword(e.target.value);
          }}
          style={{
            minWidth: wrapperRef.current
              ? wrapperRef.current.getBoundingClientRect().width
              : undefined,
            padding: "0 5px",
          }}
          endAdornment={
            <InputAdornment>
              {searchKeyword && (
                <ButtonBase
                  centerRipple
                  tabIndex={-1}
                  onClick={() => {
                    setSearchKeyword("");
                    handleSearchKeyword("");
                  }}
                >
                  <ClearIcon style={{ fontSize: "1.2em" }} />
                </ButtonBase>
              )}
            </InputAdornment>
          }
        />
      </div>
    );

  const optionsSection = () => (
    <div style={{ maxHeight: "300px", overflowY: "auto" }}>
      {filteredValues &&
        filteredValues.length > 0 &&
        filteredValues.map((v) => (
          <MenuItem
            key={v[itemId]}
            onClick={() => {
              onItemSelect(v);
            }}
            style={{
              minWidth: wrapperRef.current
                ? wrapperRef.current.getBoundingClientRect().width
                : undefined,
            }}
          >
            {multiple && (
              <Icon style={{ marginRight: "3px" }}>
                {isItemSelected(v) ? (
                  <CheckBoxIcon
                    className={classNames(
                      classes.checkBox,
                      customStyles.checkBox
                    )}
                  />
                ) : (
                  <CheckBoxOutlineBlankOutlinedIcon
                    className={classNames(
                      classes.checkBox,
                      customStyles.checkBox
                    )}
                  />
                )}
              </Icon>
            )}
            <span>
              {showImage &&
                (v[itemId] !== -1 ? (
                  <img
                    className={classes.artwork}
                    src={v[imageLabel]}
                    alt="img"
                  />
                ) : (
                  <span
                    className={classes.artwork}
                    style={{ display: "inline-block" }}
                  ></span>
                ))}
              {v.name}
            </span>
          </MenuItem>
        ))}
    </div>
  );

  const selectedOptionSetion = () => (
    <div className={classes.selectedItemsWrapper}>
      {selectedItems &&
        selectedItems.length > 0 &&
        selectedItems.map((item) => (
          <li key={item[itemId]} className={classes.selectedList}>
            {multiple ? (
              <Chip
                avatar={
                  showImage ? <Avatar src={item[imageLabel]} /> : undefined
                }
                className={classes.chip}
                label={item[itemLabel]}
                onDelete={() => {
                  handleRemoveItem(item);
                }}
              />
            ) : (
              <span>
                {showImage && (
                  <img
                    className={classes.artwork}
                    src={item[imageLabel]}
                    alt="img"
                  />
                )}
                {item[itemLabel]}
              </span>
            )}
          </li>
        ))}
    </div>
  );

  return (
    <div ref={wrapperRef}>
      <Input
        error={error}
        inputComponent={selectedOptionSetion}
        fullWidth={fullWidth}
        disabled={disabled}
        readOnly
        inputRef={inputRef}
        endAdornment={
          <InputAdornment disablePointerEvents={disabled}>
            {selectedItems && selectedItems.length > 0 && (
              <ButtonBase
                centerRipple
                tabIndex={-1}
                onClick={() => {
                  removeAllSelectedItems();
                }}
              >
                <ClearIcon style={{ fontSize: "1.2em" }} />
              </ButtonBase>
            )}

            <ButtonBase
              style={{
                marginBottom:
                  selectedItems && selectedItems.length > 0 ? 0 : "2em",
              }}
              centerRipple
              tabIndex={-1}
              onClick={() => {
                setOpen(true);
              }}
            >
              <ArrowDropDownIcon />
            </ButtonBase>
          </InputAdornment>
        }
      />
      {error && errorText && (
        <FormHelperText className={customStyles.error} error={error}>
          {errorText}
        </FormHelperText>
      )}
      {open && (
        <Menu
          id="simple-menu"
          anchorEl={wrapperRef.current}
          keepMounted
          open
          variant="menu"
          PopoverClasses={{
            paper: classes.Menupaper,
          }}
          style={{
            // top: inputRef.current
            //   ? inputRef.current.getBoundingClientRect().height
            //   : undefined,
            overflowY: "hidden !important",
          }}
          onClose={() => {
            handleClose();
          }}
        >
          <span>
            {searchSection()}
            {optionsSection()}
          </span>
        </Menu>
      )}
    </div>
  );
}

Dropdown.propTypes = {
  fullWidth: PropTypes.bool,
  searchable: PropTypes.bool,
  searchPlaceHolder: PropTypes.string,
  data: PropTypes.array.isRequired,
  onItemClick: PropTypes.func.isRequired,
  itemLabel: PropTypes.string.isRequired,
  itemId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  multiple: PropTypes.bool,
  showAllButton: PropTypes.bool,
  simpleValue: PropTypes.bool,
  itemValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onDeleteItem: PropTypes.func,
  searchByValue: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  showImage: PropTypes.bool,
  selectedValues: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  imageLabel: PropTypes.string,
  errorText: PropTypes.string,
  customStyles: PropTypes.shape({
    checkBox: PropTypes.string,
    error: PropTypes.string,
  }),
};
Dropdown.defaultProps = {
  fullWidth: false,
  searchable: false,
  searchPlaceHolder: "Search result",
  itemId: "id",
  multiple: false,
  showAllButton: true,
  simpleValue: false,
  itemValue: "id",
  onDeleteItem: (a) => a,
  searchByValue: "name",
  disabled: false,
  error: false,
  errorText: "",
  selectedValues: [],
  showImage: false,
  imageLabel: "url",
  customStyles: {
    checkBox: "",
    error: "",
  },
};

export default Dropdown;