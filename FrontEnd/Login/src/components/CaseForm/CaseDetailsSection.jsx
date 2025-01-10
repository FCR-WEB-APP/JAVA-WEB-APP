import { Box, Typography, IconButton, MenuItem, TextField, FormControlLabel, RadioGroup, Radio, FormControl, FormLabel } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

const CaseDetailsSection = ({ title, isExpanded, toggleExpanded, children, dropdownItems, onSelect, selectedValue, radioItems, onRadioChange }) => (
  <Box className="mt-6">
    <Box className="flex justify-between items-center">
      <Typography variant="h6" className="text-orange-500 font-bold">
        {title}
      </Typography>
      <IconButton onClick={toggleExpanded} sx={{ marginLeft: "auto" }}>
        {isExpanded ? <ExpandLess className="text-orange-500" /> : <ExpandMore className="text-orange-500" />}
      </IconButton>
    </Box>
    {isExpanded && (
      <Box className="mt-4">
        {dropdownItems && (
          <TextField
            select
            label={title}
            value={selectedValue}
            onChange={onSelect}
            className="w-1/3"
            size="small"
            sx={{ backgroundColor: 'white' }}
          >
            {dropdownItems.map((item, index) => (
              <MenuItem value={item} key={index}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        )}
        {radioItems && (
          <FormControl component="fieldset">
            <FormLabel component="legend" className="text-orange-500">
              {title}
            </FormLabel>
            <RadioGroup value={selectedValue} onChange={onRadioChange}>
              {radioItems.map((item, index) => (
                <FormControlLabel key={index} value={item} control={<Radio />} label={item} />
              ))}
            </RadioGroup>
          </FormControl>
        )}
        {children}
      </Box>
    )}
  </Box>
);

export default CaseDetailsSection;
