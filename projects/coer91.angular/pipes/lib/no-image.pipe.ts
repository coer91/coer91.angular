import { Pipe, PipeTransform } from '@angular/core';
import { Files, Tools } from 'coer91.tools';

@Pipe({ name: 'noImage', standalone: false })
export class NoImagePipe implements PipeTransform {

    transform(value: string | File | null | undefined, type: 'IMAGE' | 'USER' = 'IMAGE'): string {

        if (typeof value == 'string' && value.trim().toUpperCase() == 'LOADING')
            return 'coersystem/images/loading.gif';

        let NO_IMAGE = (type === 'IMAGE') 
            ? 'coersystem/images/no-image.png'
            : 'coersystem/images/no-user.png';

        if(Tools.IsOnlyWhiteSpace(value) ) {
            return NO_IMAGE;
        }

        else if (typeof value === 'string') {
            return value;
        }

        //Files.ConvertToBase64(value as File).then(base64 => { return base64 });
        return NO_IMAGE;
    }
}