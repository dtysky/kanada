#include<stdint.h>
#include <stdio.h>
#include <emscripten.h>

extern "C" {

EMSCRIPTEN_KEEPALIVE
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

EMSCRIPTEN_KEEPALIVE
uint8_t* meanFilter(uint8_t* data, uint32_t width, uint32_t height, uint8_t size) {
    int x, y, wx, wy, offset;
    int hsize = size >> 1;
    int len = size * size;
    int color[3];

    for (y = 0; y < width; y += 1) {
        for (x = 0; x < width; x += 1) {
            color[0] = 0;
            color[1] = 0;
            color[2] = 0;
            int l = x - hsize;
            int r = x + hsize;
            int t = y - hsize;
            int b = y + hsize;
            for (wy = t; wy <= b; wy += 1) {
                for (wx = l; wx <= r; wx += 1) {
                    int pos = (wx + wy * width) * 4;
                    // printf("%d, %d\n", wx, wy);
                    for (offset = 0; offset < 3; offset += 1) {
                        if (wx < 0 || wx > width || wy < 0 || wy > height) {
                            // printf("%d, %d, %d, %d\n", pos, offset, 0, color[offset]);
                            color[offset] += 0;
                            // printf("%d, %d\n", pos, color[offset]);
                        } else {
                            // printf("%d, %d, %d, %d\n", pos, offset, data[pos + offset], color[offset]);
                            color[offset] +=  data[pos + offset];
                            // printf("%d, %d\n", pos, color[offset]);
                        }
                    }
                }
            }
            int pos = (x + y * width) * 4;
            data[pos] = color[0] / len;
            data[pos + 1] = color[1] / len;
            data[pos + 2] = color[2] / len;
            // printf("%d, %d, %d, %d\n\n", pos, color[0], color[1], color[2]);
        }   
    }
    return data;
}

}