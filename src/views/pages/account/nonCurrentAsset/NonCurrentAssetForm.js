// material-ui
import {Grid} from '@mui/material';

// project imports
import {gridSpacing} from 'store/constant';

import NonCurrentAssetRegister from "./NonCurrentAssetRegister";
import NonCurrentAssetDetail from "./NonCurrentAssetDetail";

// ==============================|| 고정자산관리 ||============================== //

export default function TableBasic() {
	return (
		<Grid container spacing={gridSpacing}>
			<Grid item xs={12}>
				<NonCurrentAssetRegister/>
				<NonCurrentAssetDetail/>
			</Grid>
		</Grid>
	);
}
