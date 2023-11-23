import React from "react";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { RenderTree, data } from "./sampleData";

export default function RecursiveTreeView() {
  const [selected, setSelected] = React.useState<string[]>([]);
  console.log(selected);

  const selectedSet = React.useMemo(() => new Set(selected), [selected]);

  const parentMap = React.useMemo(() => {
    return goThroughAllNodes(data);
  }, []);

  // console.log("parentMAp", parentMap);

  function goThroughAllNodes(nodes: RenderTree, map: Record<string, any> = {}) {
    if (!nodes.children) {
      return null;
    }

    map[nodes.id] = getAllChild(nodes).splice(1);

    for (let childNode of nodes.children) {
      goThroughAllNodes(childNode, map);
    }

    return map;
  }

  // Get all children from the current node.
  function getAllChild(
    childNode: RenderTree | null,
    collectedNodes: any[] = []
  ) {
    if (childNode === null) return collectedNodes;

    collectedNodes.push(childNode.id);

    if (Array.isArray(childNode.children)) {
      for (const node of childNode.children) {
        getAllChild(node, collectedNodes);
      }
    }

    return collectedNodes;
  }

  const getChildById = (nodes: RenderTree, id: string) => {
    let array: string[] = [];
    let path: string[] = [];

    // recursive DFS
    function getNodeById(node: RenderTree, id: string, parentsPath: string[]) {
      let result = null;

      if (node.id === id) {
        return node;
      } else if (Array.isArray(node.children)) {
        for (let childNode of node.children) {
          result = getNodeById(childNode, id, parentsPath);

          if (!!result) {
            parentsPath.push(node.id);
            return result;
          }
        }

        return result;
      }

      return result;
    }

    const nodeToToggle = getNodeById(nodes, id, path);
    // console.log(path);

    return { childNodesToToggle: getAllChild(nodeToToggle, array), path };
  };

  function getOnChange(checked: boolean, nodes: RenderTree) {
    const { childNodesToToggle, path } = getChildById(data, nodes.id);
    console.log("childNodesToChange", { childNodesToToggle, checked });

    let array = checked
      ? [...selected, ...childNodesToToggle]
      : selected
          .filter((value) => !childNodesToToggle.includes(value))
          .filter((value) => !path.includes(value));

    array = array.filter((v, i) => array.indexOf(v) === i);

    setSelected(array);
  }

  const renderTree = (nodes: RenderTree) => {
    const allSelectedChildren = parentMap[
      nodes.id
    ]?.every((childNodeId: string) => selectedSet.has(childNodeId));
    const checked = selectedSet.has(nodes.id) || allSelectedChildren || false;

    const indeterminate =
      parentMap[nodes.id]?.some((childNodeId: string) =>
        selectedSet.has(childNodeId)
      ) || false;

    if (allSelectedChildren && !selectedSet.has(nodes.id)) {
      console.log("if allSelectedChildren");

      setSelected([...selected, nodes.id]);
    }

    return (
      <TreeItem
        key={nodes.id}
        nodeId={nodes.id}
        label={
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                indeterminate={!checked && indeterminate}
                onChange={(event) =>
                  getOnChange(event.currentTarget.checked, nodes)
                }
                onClick={(e) => e.stopPropagation()}
              />
            }
            label={<>{nodes.name}</>}
            key={nodes.id}
          />
        }
      >
        {Array.isArray(nodes.children)
          ? nodes.children.map((node) => renderTree(node))
          : null}
      </TreeItem>
    );
  };

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={["0", "3", "4"]}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {renderTree(data)}
    </TreeView>
  );
}
