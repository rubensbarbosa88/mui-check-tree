import { Autocomplete, TextField } from "@mui/material";
import Widget from './components/CheckTree'
import TreeViewComponent from './components/TreeViewComponent'

function App() {
  return (
    <>
      <TreeViewComponent />
      <br />

      <Autocomplete
        id="grouped-demo"
        options={[]}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="With categories" />}
      />
      <Widget />
    </>
  )
}

export default App
