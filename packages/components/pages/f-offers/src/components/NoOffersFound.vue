<template>
    <div
        :class="$style['c-noOffersFound-wrapper']"
    >
        <media-element
            :title="$t('noOffersFound.title')"
            :text="$t('noOffersFound.subtitle')"
            image-url="https://d30v2pzvrfyzpo.cloudfront.net/a/hw/img/decoration/oi_no-results-image.svg"
            :image-align="imageAlign"
            :text-size="textSize"
            :flex="flexLayout"
        >
            <search-box :class="$style['c-noOffersFound-searchBox']" />
            <f-button
                :class="$style['c-noOffersFound-link']"
                button-type="link"
                button-size="xsmall"
                :href="$t('termsAndConditionsLinkUrl')"
            >
                {{ $t('termsAndConditionsLinkText') }}
            </f-button>
        </media-element>
    </div>
</template>

<script>
import MediaElement from '@justeat/f-media-element';
import FButton from '@justeat/f-button';
import '@justeat/f-media-element/dist/f-media-element.css';
import { ALIGN, FONT_SIZE } from '@justeat/f-media-element/src/constants';
import { mapGetters } from 'vuex';
import SearchBox from './SearchBox.vue';
import { VUEX_MODULE_NAMESPACE_OFFERS } from '../store/types';

export default {
    name: 'OffersNoOffersFound',

    components: {
        MediaElement,
        FButton,
        SearchBox
    },

    data: () => ({
        imageAlign: ALIGN.CENTER,
        textSize: FONT_SIZE.LG
    }),

    computed: {
        ...mapGetters(VUEX_MODULE_NAMESPACE_OFFERS, [
            'isAuthenticated'
        ]),

        flexLayout () {
            return {
                default: {
                    column: false,
                    reverse: false
                },
                modifier: {
                    rule: [
                        '<',
                        this.isAuthenticated ? 'narrowMid' : 'mid'
                    ],
                    column: true,
                    reverse: true
                }
            };
        }
    }
};
</script>

<style lang="scss" module>
.c-noOffersFound-wrapper {
    width: 100%;
    background: $color-grey-20;
    padding: spacing(f) spacing(g);

    & .c-noOffersFound-link {
        padding: 0;

        @include media('<=narrow') {
            margin-top: spacing(e);
        }
    }

    & .c-noOffersFound-searchBox {
        padding-top: spacing(d);

        @include media('<=mid') {
            width: 300px;
        }

        @include media('<=narrowMid') {
            width: 100%;
        }

        & input {
            background-color: $color-white;
        }
    }

}
</style>
