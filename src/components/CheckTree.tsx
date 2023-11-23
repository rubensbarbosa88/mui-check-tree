import { useState } from 'react';
import CheckboxTree from 'react-checkbox-tree';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import './checkTree.css'

interface IRender {
    value: string,
    label: string,
    children?: IRender[]
}

const nodes: IRender[] = [
    {
        value: 'mars',
        label: 'Mars',
        children: [
            { value: 'phobos', label: 'Phobos' },
            { 
                value: 'deimos',
                label: 'Deimos',
                children: [
                    { value: 'phoboss', label: 'Phobos' },
                    { value: 'deimoss', label: 'Deimos' },
                ] 
            },
        ],
    },
    {
        value: 'marsa',
        label: 'Mars',
        children: [
            { value: 'phobosa', label: 'Phobos' },
            { 
                value: 'deimosa',
                label: 'Deimos',
                children: [
                    { value: 'phobosas', label: 'Phobos' },
                    { value: 'deimosas', label: 'Deimos' },
                ] 
            },
        ],
    }
];

function Widget() {
  const [checked, setChecked] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<string[]>([]);

  const findParentKey: any = (arr: IRender[], query: string) => {
    for (let i = 0; i < arr.length; i++) {
      let found
      const { value, children } = arr[i];
      
      if (children) {
        found = children.some(({ value }) => value === query)
        ? value
        : children.length !== 0
          ? findParentKey(children, query)
          : null;
      }
  
      if (found) {
        return found;
      }
    }
  
    return '';
  };

  function handleExpanded(expanded: string[]) {
    setExpanded(expanded)
  }

  function handleCheck(checked: string[]) {
    const expandedItems: string[] = checked.map(item => {
        return findParentKey(nodes, item)
    })

    setChecked(checked)
    setExpanded([...expanded, ...expandedItems])
  }

  const icons= {
    check: <CheckBoxIcon />,
    uncheck: <CheckBoxOutlineBlankIcon />,
    halfCheck: <IndeterminateCheckBoxIcon />,
    expandClose: <ChevronRightIcon />,
    expandOpen: <ExpandMoreIcon />,
    expandAll: <span />,
    collapseAll: <span />,
    parentClose: <span />,
    parentOpen: <span />,
    leaf: <span />,
  }

  return (
    <CheckboxTree
      showNodeIcon
      nodes={nodes}
      checked={checked}
      expanded={expanded}
      onCheck={handleCheck}
      onExpand={handleExpanded}
      icons={icons}
    />
  );
}

export default Widget