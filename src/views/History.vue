<template>
    <div>
        <div class="page-title">
            <h3>History of records</h3>
        </div>

        <div class="history-chart">
            <canvas></canvas>
        </div>

        <Loader v-if="loading" />

        <p class="center" v-else-if="!records.length">
            No records were found. But you can create one
            <router-link to="/record">here</router-link>
        </p>

        <section v-else>
            <HistoryTable :records="items" />

            <Paginate
                v-model="page"
                :page-count="pageCount"
                :click-handler="pageChangeHandler"
                :prev-text="'Back'"
                :next-text="'Next'"
                :container-class="'pagination'"
                :page-class="'waves-effect'"
                :active-class="'blue'"
            />
        </section>
    </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable";
import paginationMixin from "@/mixins/pagination.mixin.js";
export default {
    name: "history",
    mixins: [paginationMixin],
    data: () => ({
        loading: true,
        records: [],
    }),
    async mounted() {
        this.records = await this.$store.dispatch("fetchRecords");
        const categories = await this.$store.dispatch("fetchCategories");

        this.setupPagination(
            this.records.map((record) => {
                return {
                    ...record,
                    categoryName: categories.find(
                        (c) => c.id === record.categoryId
                    ).title,
                    typeClass: record.type === "income" ? "green" : "red",
                    typeText: record.type === "income" ? "Income" : "Outcome",
                };
            })
        );

        this.loading = false;
    },
    components: {
        HistoryTable,
    },
};
</script>
