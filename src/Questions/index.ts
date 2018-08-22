import * as chalkPipe from 'chalk-pipe';
import ImageOperations from "../Enums/ImageOperations";
import InputOutputFormats from '../Enums/InputOutputFormats';
import InputType from "../Enums/InputType";
import FileUtils from '../Utils/FileUtils';

export default {
    inputType: {
        type: "list",
        message: "What is your input type?",
        name: "inputType",
        choices: [{
            name: "File",
            value: InputType.File,
        }, {
            name: "Directory",
            value: InputType.Directory,
        }],
    },
    inputFilePath: {
        type: 'input',
        message: 'Input file path:',
        name: 'inputFilePath',
        validate: (path: string) => {
            if (!FileUtils.exists(path)) {
                return 'File not exists.';
            } else if (!FileUtils.isSupportedFile(path)) {
                return 'File is not supported.';
            }
            return true;
        },
    },
    outputFilePath: {
        type: 'input',
        message: 'Output file path:',
        name: 'outputFilePath',
    },
    inputDirPath: {
        type: 'input',
        message: 'Directory path:',
        name: 'inputDirPath',
        validate: (path: string) => {
            try {
                if (!FileUtils.isDirectory(path)) {
                    return 'Not directory.';
                } else {
                    const foundImages = FileUtils.dirFiles(path, FileUtils.INPUT_FORMATS);
                    if (foundImages.length === 0) {
                        return 'Not found image.';
                    }
                }
            } catch (err) {
                return 'Invalid path.';
            }
            return true;
        },
    },
    outputDirPath: {
        type: 'input',
        message: 'Output directory path:',
        name: 'outputDirPath',
        validate: (path: string) => {
            try {
                if (!FileUtils.isDirectory(path)) {
                    return 'Not directory.';
                }
            } catch (err) {
                return 'Invalid path.';
            }
            return true;
        },
    },
    suffix: {
        type: 'input',
        message: 'Enter the suffix:',
        name: 'suffix',
    },
    prefix: {
        type: 'input',
        message: 'Enter the prefix:',
        name: 'prefix',
    },
    suffixOrPrefix: {
        type: 'list',
        message: 'Do you want suffix or prefix?',
        name: 'suffixOrPrefix',
        choices: [{
            name: 'Prefix',
            value: 'prefix',
        }, {
            name: 'Suffix',
            value: 'suffix',
        }, {
            name: 'No',
            value: 'no',
        }],
    },
    operations: {
        type: 'list',
        message: 'What do you want?',
        name: 'operation',
        choices: [{
            name: 'Optimize',
            value: ImageOperations.Optimize,
        }, {
            name: 'Convert',
            value: ImageOperations.Convert,
        }, {
            name: 'Crop',
            value: ImageOperations.Crop,
        }, {
            name: 'Resize',
            value: ImageOperations.Resize,
        }, {
            name: 'Rotate',
            value: ImageOperations.Rotate,
        }],
    },
    autoOrient: {
        type: 'confirm',
        message: 'Auto orientate the image?',
        name: 'autoOrient',
    },
    isSetDirection: {
        type: 'confirm',
        message: 'Would you like to set direction?',
        name: 'isSetDirection',
    },
    direction: {
        type: 'list',
        message: 'Select the direction?',
        name: 'direction',
        choices: [
            { name: 'NorthWest', value: 'NorthWest' },
            { name: 'North', value: 'North' },
            { name: 'NorthEast', value: 'NorthEast' },
            { name: 'West', value: 'West' },
            { name: 'Center', value: 'Center' },
            { name: 'East', value: 'East' },
            { name: 'SouthWest', value: 'SouthWest' },
            { name: 'South', value: 'South' },
            { name: 'SouthEast', value: 'SouthEast' },
        ],
    },
    outputType: {
        type: 'list',
        message: 'The file format to be converted:',
        name: 'outputType',
        choices: [
            { name: 'Bitmap (.bmp)', value: InputOutputFormats.BITMAP },
            { name: 'JPG (.jpg)', value: InputOutputFormats.JPG },
            { name: 'PNG (.png)', value: InputOutputFormats.PNG },
            { name: 'SVG (.svg)', value: InputOutputFormats.SVG },
            { name: 'TIFF (.tiff)', value: InputOutputFormats.TIFF },
            { name: 'PDF (.pdf)', value: InputOutputFormats.PDF },
        ],
    },
    quality: {
        type: 'input',
        message: 'Set the output quality (1-100)?',
        name: 'quality',
        default: 100,
        validate: (value: string): any => {
            const quality: number = parseInt(value, 10);
            if (Number.isInteger(quality)) {
                if (quality <= 0 || quality > 100) {
                    return 'Enter a value between 1 - 100.';
                }
            } else {
                return 'Type the number.';
            }
            return true;
        },
    },
    backgroundColor: {
        type: 'input',
        message: 'Background color:',
        name: 'backgroundColor',
        transformer: (color: string): any => {
            return chalkPipe(color)(color);
        },
    },
    degrees: {
        type: 'input',
        message: 'Degrees:',
        name: 'degrees',
        validate: (value: string): any => {
            const quality: number = parseInt(value, 10);
            if (Number.isInteger(quality)) {
                if (quality <= 0 || quality > 360) {
                    return 'Enter a value between 1 - 360.';
                }
            } else {
                return 'Type the number.';
            }
            return true;
        },
    },
    ignoreAspectRatio: {
        type: 'confirm',
        message: 'Ignore aspect ratio when resizing?',
        name: 'ignoreAspectRatio',
    },
    width: {
        type: 'input',
        message: 'Width?',
        name: 'width',
    },
    height: {
        type: 'input',
        message: 'Height?',
        name: 'height',
    },
    x: {
        type: 'input',
        message: 'Left distance of crop:',
        name: 'x',
        validate: (value: string): any => {
            const quality: number = parseInt(value, 10);
            if (Number.isInteger(quality)) {
                if (quality < 0) {
                    return 'Must be greater than 0.';
                }
            } else {
                return 'Type the number.';
            }
            return true;
        },
    },
    y: {
        type: 'input',
        message: 'Top distance of crop:',
        name: 'y',
        validate: (value: string): any => {
            const quality: number = parseInt(value, 10);
            if (Number.isInteger(quality)) {
                if (quality < 0) {
                    return 'Must be greater than 0.';
                }
            } else {
                return 'Type the number.';
            }
            return true;
        },
    },
};
