import { Box } from "@mui/system";
import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/snippets/latex";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/theme-monokai";
import AceEditor from "react-ace";


export default function LaTeXAce() {
    return (
    <Box component={"section"}>
      <AceEditor
        name="editor"
        mode="latex"
        value="test"
        theme="monokai"
        height="90vh"
        width="48vw"
        fontSize="1.1rem"
        enableBasicAutocompletion={true}
        enableLiveAutocompletion={true}
        enableSnippets={true}
      />
    </Box>
  );
    }