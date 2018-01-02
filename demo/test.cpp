#include<stdint.h>
#include <stdio.h>

extern "C" {

uint8_t* colorInvert(uint8_t* data, uint32_t size) {
    int max = 255;
    int i;
    for (i = 0; i < size; i += 4) {
        data[i] = max - data[i];
        data[i + 1] = max - data[i + 1];
        data[i + 2] = max - data[i + 2];
        data[i + 3] = max - data[i + 3];
    }
    return data;
}

}