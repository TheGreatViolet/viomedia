import { NextApiRequest, NextApiResponse } from "next";
import { editSettings } from "../../functions/files";

export default (req: NextApiRequest, res: NextApiResponse) => {
    const reqbody: any = req.body;
    console.log(reqbody)

    switch (editSettings(reqbody['setting'], reqbody['settingDat'])) {
        case 'nodir': 
            res.send({ "status": 'nodir' });
            break;
        case 'success': 
            res.send({ "status": 'success' });
            break;
    }
}